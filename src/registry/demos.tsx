"use client";

import type { ReactNode } from "react";

export type ControlValue = string | number;
export type ControlValues = Readonly<Record<string, ControlValue>>;
