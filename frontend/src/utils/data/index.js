import { activeDashboardIcon, activeInformationIcon, activeVerificationIcon, capsulePillIcon, dashboardIcon, DrugIntIcon, drugListIcon, informationIcon, manIcon, PilIdentifierIcon, verificationIcon, VitaminsIcon } from "../../assets/svgs/svg";

export const sideBarLink = [
    {
        icon: dashboardIcon,
        activeIcon: activeDashboardIcon,
        title: "Dashboard",
        link: "/"
    },
    {
        icon: verificationIcon,
        activeIcon: activeVerificationIcon,
        title: "Verification",
        link: "/verification"
    },
    {
        icon: informationIcon,
        activeIcon: activeInformationIcon,
        title: "Information",
        link: "/information"
    },
];

export const currentServices = [
    {
        name: "Vitamins and Supplements",
        icon: VitaminsIcon
    },
    {
        name: "Drug interaction checker A - Z",
        icon: DrugIntIcon
    },
    {
        name: "Commonly abused drugs",
        icon: capsulePillIcon
    },
    {
        name: "Drug list A - Z",
        icon: drugListIcon
    },
    {
        name: "Pill identifer",
        icon: PilIdentifierIcon
    },
    {
        name: "Consult Manufacturer",
        icon: manIcon
    },
];

export const manProducts = [
    {
        name: "Amoxylin",
        icon: VitaminsIcon
    },
    {
        name: "Paracetamol",
        icon: DrugIntIcon
    },
];

export const relatedDrugs = [
    {
        name: "Ibuprofen",
        link: "https://www.nhs.uk/medicines/ibuprofen-for-adults/",
    },
    {
        name: "Naproxen",
        link: "https://www.nhs.uk/medicines/naproxen/",
    },
    {
        name: "Diclofenac",
        link: "https://www.nhs.uk/medicines/diclofenac/",
    },
];