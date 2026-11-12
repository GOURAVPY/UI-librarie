"use client";

import { useState } from "react";
import { demos, initialValues, type ControlValues } from "@/registry/demos";

interface PlaygroundProps {
  slug: string;
  name: string;
  source: string;
  installCommand: string;
  dependencies: readonly string[];
}

const DEVICES = [
  { label: "Desktop", width: null },
  { label: "Tablet", width: 768 },
  { label: "Mobile", width: 375 },
] as const;
