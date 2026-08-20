import {
  AffiliateDuoToneBlack,
  Chat,
  Courses,
  CreditCard,
  Explore,
  GlobeDuoToneBlack,
  Home,
  IDuotoneBlack,
  ZapDouToneBlack
} from "@/icons"

export type MenuProps = {
  id: number
  label: string
  icon: JSX.Element
  path: string
  section?: boolean
  integration?: boolean
}

export type GroupMenuProps = {
  id: number
  label: string
  icon: JSX.Element
  path: string
}

export const LANDING_PAGE_MENU: MenuProps[] = [
  {
    id: 0,
    label: "Home",
    icon: <Home />,
    path: "/",
    section: true,
  },
  {
    id: 1,
    label: "Pricing",
    icon: <CreditCard />,
    path: "#pricing",
    section: true,
  },
  {
    id: 1,
    label: "Explore",
    icon: <Explore />,
    path: "/explore",
  },
]
export const GROUP_PAGE_MENU: MenuProps[] = [
  {
    id: 0,
    label: "Group",
    icon: <Home />,
    path: "",
    section: true,
  },
  {
    id: 1,
    label: "Courses",
    icon: <Courses />,
    path: "/courses",
    section: true,
  },
  {
    id: 2,
    label: "Messages",
    icon: <Chat />,
    path: "/messages",
    section: true,
  },
]

export const SIDEBAR_SETTINGS_MENU: MenuProps[] = [
  {
    id: 0,
    label: "General",
    icon: <IDuotoneBlack />,
    path: "",
  },
  {
    id: 1,
    label: "Subscriptions",
    icon: <CreditCard />,
    path: "subscriptions",
  },
  {
    id: 2,
    label: "Affiliates",
    icon: <AffiliateDuoToneBlack />,
    path: "affiliates",
  },
  {
    id: 3,
    label: "Domain Config",
    icon: <GlobeDuoToneBlack />,
    path: "domains",
  },
  {
    id: 4,
    label: "Integration",
    icon: <ZapDouToneBlack />,
    path: "integrations",
    integration: true,
  },
]

type IntegrationsListItemProps = {
  id: string
  name: "stripe"
  logo: string
  description: string
  title: string
  modalDescription: string
}

export const INTEGRATION_LIST_ITEMS: IntegrationsListItemProps[] = [
  {
    id: "1",
    name: "stripe",
    description:
      "Stripe is the fastest and easiest way to integrate payments and financial services into your software platform or marketplace.",
    logo: "914be637-39bf-47e6-bb81-37b553163945",
    title: "Connect Stripe Account",
    modalDescription:
      "The world's most successful platforms and marketplaces including Shopify and DoorDash, use Stripe Connect.",
  },
]