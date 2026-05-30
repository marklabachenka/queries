# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is an e-commerce data utilities project that provides query functions for a SQLite database. The project uses TypeScript with the `sqlite` async wrapper (not raw `sqlite3` callbacks) and includes a Claude Agent SDK integration.

## Database Schema

The SQLite database contains tables for a complete e-commerce system including:

- customers, addresses, customer_segments, customer_activity_log
- products, categories, inventory, warehouses
- orders, order_items
- reviews
- promotions

See [src/schema.ts](src/schema.ts) for the complete schema definition.

## Development Commands

```bash
# Install dependencies and initialize
npm run setup

# Run main entry point (initializes DB and schema)
npx tsx src/main.ts

# Run the Claude Agent SDK script
npm run sdk
```

There is no build step — use `tsx` to execute TypeScript files directly.

## Working with Queries

The project uses the `sqlite` package (a Promise wrapper around `sqlite3`), so all queries use `async/await` — **not** the raw sqlite3 callback style.

```typescript
import { Database } from "sqlite";

export async function getCustomerByEmail(db: Database, email: string): Promise<any> {
  return db.get(`SELECT * FROM customers WHERE email = ?`, [email]);
}

export async function listCustomers(db: Database): Promise<any[]> {
  return db.all(`SELECT * FROM customers`);
}
```

- Single record: `db.get(sql, params)` → `Promise<row | undefined>`
- Multiple records: `db.all(sql, params)` → `Promise<row[]>`
- Use parameterized queries (positional `?`) for all user-supplied values
- Complex queries use CTEs (`WITH` clauses) and SQLite date functions (`julianday()`, `datetime()`)

## Claude Agent SDK

`sdk.ts` at the project root uses `@anthropic-ai/claude-agent-sdk` (formerly `@anthropic-ai/claude-code`). Run it with `npm run sdk`.

## Critical Guidance

- Critical: All database queries must be written in the `./src/queries` dir
