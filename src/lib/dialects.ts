import fs from "node:fs";
import path from "node:path";
import type { Locale } from "@/lib/locales";
import type { DialectPin } from "@/lib/types";

const COLUMNS = [
  "id",
  "name_hy",
  "name_en",
  "region_hy",
  "region_en",
  "description_hy",
  "description_en",
  "speaker_hy",
  "speaker_en",
  "latitude",
  "longitude",
  "audio",
] as const;

type Column = (typeof COLUMNS)[number];
type RawDialect = Record<Column, string> & {
  latitudeNumber: number;
  longitudeNumber: number;
  audioSrc: string;
  audioAvailable: boolean;
};

export type DialectCatalog =
  | { status: "ready"; dialects: RawDialect[] }
  | { status: "error" };

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  const source = text.replace(/^\uFEFF/, "");

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];

    if (inQuotes) {
      if (character === '"') {
        if (source[index + 1] === '"') {
          field += '"';
          index += 1;
        } else {
          inQuotes = false;
        }
      } else {
        field += character;
      }
      continue;
    }

    if (character === '"') {
      inQuotes = true;
    } else if (character === ",") {
      row.push(field);
      field = "";
    } else if (character === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (character !== "\r") {
      field += character;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter((cells) => cells.some((cell) => cell.trim().length > 0));
}

function audioStatus(audioField: string): { src: string; available: boolean } {
  const publicAudio = path.resolve(process.cwd(), "public", "audio");
  const resolved = path.resolve(process.cwd(), "public", audioField);
  const insideAudio =
    resolved === publicAudio || resolved.startsWith(`${publicAudio}${path.sep}`);

  return {
    src: `/${audioField}`,
    available: insideAudio && fs.existsSync(resolved),
  };
}

export function loadDialects(): DialectCatalog {
  const filePath = path.join(process.cwd(), "content", "dialects.csv");

  let text: string;
  try {
    text = fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.error("Could not read content/dialects.csv", error);
    return { status: "error" };
  }

  const rows = parseCsv(text).filter((cells) => !cells[0]?.trim().startsWith("#"));
  const header = rows[0]?.map((cell) => cell.trim());

  if (!header || COLUMNS.some((column, index) => header[index] !== column)) {
    console.error("content/dialects.csv is missing the expected header row.");
    return { status: "error" };
  }

  const dialects: RawDialect[] = [];
  const seen = new Set<string>();

  rows.slice(1).forEach((cells, rowIndex) => {
    const line = rowIndex + 2;
    const record = Object.fromEntries(
      COLUMNS.map((column, index) => [column, (cells[index] ?? "").trim()]),
    ) as Record<Column, string>;

    if (!/^[a-z0-9-]+$/.test(record.id)) {
      console.warn(`Dialect row ${line}: id must use lowercase letters, numbers, or hyphens.`);
      return;
    }
    if (seen.has(record.id)) {
      console.warn(`Dialect row ${line}: duplicate id "${record.id}".`);
      return;
    }
    if (COLUMNS.some((column) => record[column].length === 0)) {
      console.warn(`Dialect row ${line}: a required field is empty.`);
      return;
    }

    const latitudeNumber = Number(record.latitude);
    const longitudeNumber = Number(record.longitude);
    if (!Number.isFinite(latitudeNumber) || latitudeNumber < -90 || latitudeNumber > 90) {
      console.warn(`Dialect row ${line}: latitude is not a decimal degree.`);
      return;
    }
    if (!Number.isFinite(longitudeNumber) || longitudeNumber < -180 || longitudeNumber > 180) {
      console.warn(`Dialect row ${line}: longitude is not a decimal degree.`);
      return;
    }
    if (!/^audio\/[A-Za-z0-9._-]+$/.test(record.audio)) {
      console.warn(`Dialect row ${line}: audio must look like audio/name.wav`);
      return;
    }

    const audio = audioStatus(record.audio);
    if (!audio.available) {
      console.warn(`Dialect row ${line}: missing file public/${record.audio}`);
    }

    seen.add(record.id);
    dialects.push({
      ...record,
      latitudeNumber,
      longitudeNumber,
      audioSrc: audio.src,
      audioAvailable: audio.available,
    });
  });

  return { status: "ready", dialects };
}

export function localizeDialect(dialect: RawDialect, locale: Locale): DialectPin {
  return {
    id: dialect.id,
    name: dialect[locale === "hy" ? "name_hy" : "name_en"],
    region: dialect[locale === "hy" ? "region_hy" : "region_en"],
    description: dialect[locale === "hy" ? "description_hy" : "description_en"],
    speaker: dialect[locale === "hy" ? "speaker_hy" : "speaker_en"],
    latitude: dialect.latitudeNumber,
    longitude: dialect.longitudeNumber,
    audioSrc: dialect.audioSrc,
    audioAvailable: dialect.audioAvailable,
  };
}
