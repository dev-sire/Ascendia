### Ascendia: The next-generation LMS

The Project is currently under-development, I will be keeping tracks of the weekly updates via this tree structure...

```
📦 Ascendia
├─ .env.example
├─ .eslintrc.json
├─ .gitignore
├─ .prettierrc
├─ .vscode
│  └─ settings.json
├─ README.md
├─ bun.lock
├─ components.json
├─ next.config.mjs
├─ package.json
├─ postcss.config.mjs
├─ prisma
│  └─ schema.prisma
├─ public
│  ├─ dashboard-snippet.png
│  ├─ next.svg
│  └─ vercel.svg
├─ src
│  ├─ actions
│  │  └─ auth.ts
│  ├─ app
│  │  ├─ (auth)
│  │  │  ├─ layout.tsx
│  │  │  ├─ sign-in
│  │  │  │  └─ page.tsx
│  │  │  └─ sign-up
│  │  │     └─ page.tsx
│  │  ├─ (landing)
│  │  │  ├─ _components
│  │  │  │  ├─ call-to-action
│  │  │  │  │  └─ index.tsx
│  │  │  │  ├─ dashboard-snippet
│  │  │  │  │  └─ index.tsx
│  │  │  │  ├─ navbar
│  │  │  │  │  ├─ index.tsx
│  │  │  │  │  └─ menu.tsx
│  │  │  │  └─ pricing
│  │  │  │     └─ index.tsx
│  │  │  ├─ layout.tsx
│  │  │  └─ page.tsx
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  └─ layout.tsx
│  ├─ components
│  │  ├─ forms
│  │  │  ├─ sign-in
│  │  │  │  ├─ index.tsx
│  │  │  │  └─ schema.ts
│  │  │  └─ sign-up
│  │  │     ├─ index.tsx
│  │  │     └─ schema.ts
│  │  ├─ global
│  │  │  ├─ backdrop-gradient
│  │  │  │  └─ index.tsx
│  │  │  ├─ form-generator
│  │  │  │  └─ index.tsx
│  │  │  ├─ glass-card
│  │  │  │  └─ index.tsx
│  │  │  ├─ glass-sheet
│  │  │  │  └─ index.tsx
│  │  │  ├─ global-oauth-button
│  │  │  │  └─ index.tsx
│  │  │  ├─ gradient-text
│  │  │  │  └─ index.tsx
│  │  │  ├─ loader
│  │  │  │  └─ index.tsx
│  │  │  └─ otp-input
│  │  │     └─ index.tsx
│  │  ├─ theme
│  │  │  └─ index.tsx
│  │  └─ ui
│  │     ├─ accordion.tsx
│  │     ├─ alert-dialog.tsx
│  │     ├─ alert.tsx
│  │     ├─ aspect-ratio.tsx
│  │     ├─ avatar.tsx
│  │     ├─ badge.tsx
│  │     ├─ breadcrumb.tsx
│  │     ├─ button.tsx
│  │     ├─ calendar.tsx
│  │     ├─ card.tsx
│  │     ├─ carousel.tsx
│  │     ├─ chart.tsx
│  │     ├─ checkbox.tsx
│  │     ├─ collapsible.tsx
│  │     ├─ command.tsx
│  │     ├─ context-menu.tsx
│  │     ├─ dialog.tsx
│  │     ├─ drawer.tsx
│  │     ├─ dropdown-menu.tsx
│  │     ├─ form.tsx
│  │     ├─ hover-card.tsx
│  │     ├─ input-otp.tsx
│  │     ├─ input.tsx
│  │     ├─ label.tsx
│  │     ├─ menubar.tsx
│  │     ├─ navigation-menu.tsx
│  │     ├─ pagination.tsx
│  │     ├─ popover.tsx
│  │     ├─ progress.tsx
│  │     ├─ radio-group.tsx
│  │     ├─ resizable.tsx
│  │     ├─ scroll-area.tsx
│  │     ├─ select.tsx
│  │     ├─ separator.tsx
│  │     ├─ sheet.tsx
│  │     ├─ skeleton.tsx
│  │     ├─ slider.tsx
│  │     ├─ sonner.tsx
│  │     ├─ switch.tsx
│  │     ├─ table.tsx
│  │     ├─ tabs.tsx
│  │     ├─ textarea.tsx
│  │     ├─ toast.tsx
│  │     ├─ toaster.tsx
│  │     ├─ toggle-group.tsx
│  │     ├─ toggle.tsx
│  │     ├─ tooltip.tsx
│  │     └─ use-toast.ts
│  ├─ constants
│  │  ├─ forms.ts
│  │  ├─ icons.ts
│  │  ├─ index.ts
│  │  ├─ menu.tsx
│  │  ├─ menus.tsx
│  │  ├─ placeholder.tsx
│  │  └─ slider.tsx
│  ├─ hooks
│  │  ├─ authentication
│  │  │  └─ index.ts
│  │  └─ navigation
│  │     └─ index.ts
│  ├─ icons
│  │  ├─ about.tsx
│  │  ├─ affiliate-duotone-black.tsx
│  │  ├─ badge-plus.tsx
│  │  ├─ bell.tsx
│  │  ├─ brief-case-duotone-black.tsx
│  │  ├─ briefcase-duotone-white.tsx
│  │  ├─ buisness.tsx
│  │  ├─ carot-sort.tsx
│  │  ├─ chat.tsx
│  │  ├─ check-badge.tsx
│  │  ├─ check.tsx
│  │  ├─ comment.tsx
│  │  ├─ compass.tsx
│  │  ├─ courses.tsx
│  │  ├─ credit-card.tsx
│  │  ├─ dashboard.tsx
│  │  ├─ document.tsx
│  │  ├─ empty-circle.tsx
│  │  ├─ empty.tsx
│  │  ├─ envalope.tsx
│  │  ├─ exclaimation-mark.tsx
│  │  ├─ explore.tsx
│  │  ├─ file-duotone-black.tsx
│  │  ├─ file-duotone-white.tsx
│  │  ├─ fitness.tsx
│  │  ├─ globe-duotone-black.tsx
│  │  ├─ google.tsx
│  │  ├─ grid.tsx
│  │  ├─ heart.tsx
│  │  ├─ home-duo-tone-white.tsx
│  │  ├─ home.tsx
│  │  ├─ i-duotone-black.tsx
│  │  ├─ index.tsx
│  │  ├─ life-style.tsx
│  │  ├─ like.tsx
│  │  ├─ links.tsx
│  │  ├─ logout.tsx
│  │  ├─ mega-phone.tsx
│  │  ├─ megaphone-duo-tone-black.tsx
│  │  ├─ megaphone-duo-tone-white.tsx
│  │  ├─ message.tsx
│  │  ├─ music.tsx
│  │  ├─ personal-development.tsx
│  │  ├─ purple-check.tsx
│  │  ├─ settings.tsx
│  │  ├─ social-media.tsx
│  │  ├─ tech.tsx
│  │  ├─ unlike.tsx
│  │  ├─ white-label.tsx
│  │  └─ zap-duotone-black.tsx
│  ├─ lib
│  │  ├─ prisma.ts
│  │  └─ utils.ts
│  ├─ middleware.ts
│  ├─ react-query
│  │  └─ provider.tsx
│  └─ redux
│     ├─ provider.tsx
│     └─ store.ts
├─ tailwind.config.ts
└─ tsconfig.json
```