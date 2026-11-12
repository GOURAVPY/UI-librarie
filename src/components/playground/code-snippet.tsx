"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

interface CodeSnippetProps {
  label: string;
  code: string;
  /** Starts collapsed with an "Expand snippet" button. For long files. */
  collapsible?: boolean;
}
