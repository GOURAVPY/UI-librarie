"use client";

import { useEffect, useRef, useState } from "react";

export interface CopyMenuItem {
  readonly label: string;
  /** The text placed on the clipboard. */
  readonly text: string;
}

export interface CopyMenuLink {
  readonly label: string;
  readonly href: string;
}
