"use client";

import { useState } from "react";
import { CodeSnippet } from "./code-snippet";

interface CodePanelProps {
  slug: string;
  installCommand: string;
  dependencies: readonly string[];
  usage: string;
  source: string;
}

type InstallMode = "cli" | "manual";
