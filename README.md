# Finance Insight Demo

Finance Insight Demo คือเว็บแอปแดชบอร์ดการเงินสำหรับดูข้อมูลอัตราแลกเปลี่ยนสกุลเงินแบบสมัยใหม่ สร้างด้วย Next.js App Router, TypeScript, Tailwind CSS และ shadcn/ui โดยเน้นคุณภาพงาน frontend สำหรับ portfolio: UI แบบ SaaS dashboard, responsive layout, reusable components และการเชื่อมต่อ API จริงผ่าน Frankfurter API v2

## ฟีเจอร์หลัก

- Dashboard ภาพรวมตลาดค่าเงิน พร้อม overview cards, market trend, chart, exchange table, quick converter และ watchlist
- หน้ารายการสกุลเงิน พร้อมค้นหา กรอง base currency เรียงลำดับ และ pagination
- หน้า converter สำหรับแปลงค่าเงินแบบเลือกคู่สกุลเงินได้
- หน้า historical rates พร้อม chart, filter และ export CSV
- หน้า watchlist สำหรับเพิ่ม/ลบคู่สกุลเงินที่ต้องการติดตาม
- หน้า settings สำหรับตั้งค่า default base currency, theme mode และ auto-refresh interval
- รองรับ light/dark theme และ sync ค่ากับ settings
- รองรับ responsive layout ทั้ง desktop, tablet และ mobile พร้อม mobile navigation drawer

## Tech Stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Radix UI
- React Query
- Zustand
- Recharts
- Lucide React

## API ที่ใช้

โปรเจกต์นี้ใช้ Frankfurter API v2 สำหรับข้อมูลอัตราแลกเปลี่ยน

```txt
https://api.frankfurter.dev/v2
```

Endpoints หลัก:

- `GET /currencies` สำหรับรายการสกุลเงิน
- `GET /rates` สำหรับ latest rates และ historical rates
- `GET /rate/{base}/{quote}` สำหรับอัตราแลกเปลี่ยนของคู่สกุลเงินเดียว

รายละเอียดเพิ่มเติมอยู่ใน [API.md](API.md)

## การติดตั้งและรันโปรเจกต์

ติดตั้ง dependencies:

```bash
npm install
```

รัน development server:

```bash
npm run dev
```

เปิดเว็บที่:

```txt
http://localhost:3000
```

Build สำหรับ production:

```bash
npm run build
```

ตรวจ lint:

```bash
npm run lint
```

รัน production build:

```bash
npm run start
```

## โครงสร้างโปรเจกต์

```txt
src/
  app/                 Next.js routes และ page composition
  components/          UI components และ feature components
  components/ui/       shadcn/ui primitives
  lib/adapters/        แปลง API data เป็น view models
  lib/query/           React Query keys และ hooks
  lib/settings/        settings persistence และ theme helpers
  lib/watchlist/       watchlist persistence
  lib/types/           shared TypeScript types
  services/            Frankfurter API service functions
  store/               global UI state store
```

## Pages

- `/` Dashboard
- `/currencies` Currency list
- `/converter` Currency converter
- `/historical-rates` Historical rates
- `/watchlist` Watchlist
- `/settings` Settings

## Architecture Notes

- `page.tsx` ทำหน้าที่ composition เป็นหลัก
- Server state ใช้ React Query
- API calls อยู่ใน `src/services/frankfurter-service.ts`
- Data transformation อยู่ใน `src/lib/adapters`
- UI แยกเป็น reusable components ตาม feature
- Settings และ watchlist เก็บใน `localStorage` และ sync ผ่าน shared client stores
- Responsive design เริ่มจาก mobile-first แล้วค่อยขยายด้วย `sm`, `md`, `xl`

## Responsive Design

โปรเจกต์รองรับหน้าจอหลายขนาด:

- Mobile: ใช้ mobile drawer navigation
- Tablet: layout เริ่มแบ่งคอลัมน์เมื่อพื้นที่พอ
- Desktop: ใช้ sidebar แบบ fixed และ dashboard grid แบบเต็มรูปแบบ

ตารางข้อมูลใช้ horizontal scroll เพื่อป้องกัน layout ล้นบนจอเล็ก ส่วนฟอร์มและ cards จะ stack เป็นคอลัมน์เดียวบน mobile

## Environment

Frankfurter API ไม่ต้องใช้ API key ในการใช้งานพื้นฐาน หากต้องการปรับค่า base URL หรือ config เพิ่มเติมสามารถดูจากไฟล์ `.env.local` และ service layer ของโปรเจกต์

## เป้าหมายของโปรเจกต์

โปรเจกต์นี้ออกแบบมาเพื่อแสดงแนวทางการทำ frontend dashboard ที่ดูเป็นงานจริง:

- โครงสร้าง component อ่านง่าย
- แยก data fetching, adapter และ UI ออกจากกัน
- ใช้ API จริงแทน mock data
- รองรับ responsive และ dark mode
- เน้น maintainability มากกว่า over-engineering
