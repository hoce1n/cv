"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { deleteRecord, saveRecord } from "@/app/admin/actions";

type AdminRow = Record<string, unknown> & { id?: number };

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className="h-11 min-w-24 border border-primary bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:border-accent hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
      disabled={pending}
    >
      {pending ? "Saving…" : "Save"}
    </button>
  );
}

export function AdminRecordForm({
  table,
  label,
  row,
}: {
  table: string;
  label: string;
  row?: AdminRow;
}) {
  const [confirming, setConfirming] = useState(false);
  const data = row
    ? Object.fromEntries(Object.entries(row).filter(([key]) => !["id", "updatedAt"].includes(key)))
    : {};
  const isExisting = Boolean(row?.id);

  return (
    <form action={saveRecord} className="flex h-full flex-col border border-border bg-card p-5">
      <input type="hidden" name="table" value={table} />
      {isExisting && <input type="hidden" name="id" value={String(row?.id)} />}

      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-serif text-xl leading-tight tracking-[-0.02em]">
            {isExisting ? `${label}` : `New ${label}`}
          </h3>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            {isExisting ? `Record #${row?.id}` : "Unsaved"}
          </p>
        </div>
        {isExisting &&
          (confirming ? (
            <div className="flex items-center gap-2">
              <button
                type="submit"
                formAction={deleteRecord}
                name="table"
                value={table}
                className="h-11 border border-destructive px-3 text-sm font-medium text-destructive"
              >
                Confirm delete
              </button>
              <button
                type="button"
                className="h-11 border border-border px-3 text-sm"
                onClick={() => setConfirming(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="h-11 border border-transparent px-3 text-sm text-destructive hover:border-destructive"
              onClick={() => setConfirming(true)}
            >
              Delete
            </button>
          ))}
      </div>

      <label className="sr-only" htmlFor={`${table}-${row?.id ?? "new"}-data`}>
        {label} JSON
      </label>
      <textarea
        id={`${table}-${row?.id ?? "new"}-data`}
        name="data"
        defaultValue={JSON.stringify(data, null, 2)}
        className="mt-4 min-h-36 w-full flex-1 border border-border bg-background p-3 font-mono text-xs leading-5"
        required
        spellCheck={false}
      />
      <p className="mt-2 text-xs leading-5 text-muted-foreground">
        JSON object for this table. <code className="font-mono">id</code> and{" "}
        <code className="font-mono">updatedAt</code> are ignored.
      </p>
      <div className="mt-4">
        <SaveButton />
      </div>
    </form>
  );
}
