export const categories = [
  {
    id: "all",
    name: "All Courses",
    slug: "all",
    description: "Explore all available courses.",
    icon: "BookOpen",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    id: "development",
    name: "Development",
    slug: "development",
    description: "Learn programming and build applications.",
    icon: "Code2",
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: "design",
    name: "Design",
    slug: "design",
    description: "Create beautiful and user-friendly experiences.",
    icon: "Palette",
    color: "bg-pink-50 text-pink-600",
  },
  {
    id: "business",
    name: "Business",
    slug: "business",
    description: "Develop business and management skills.",
    icon: "BriefcaseBusiness",
    color: "bg-amber-50 text-amber-600",
  },
  {
    id: "marketing",
    name: "Marketing",
    slug: "marketing",
    description: "Master digital marketing and promotion.",
    icon: "Megaphone",
    color: "bg-orange-50 text-orange-600",
  },
  {
    id: "data-science",
    name: "Data Science",
    slug: "data-science",
    description: "Discover data analysis and machine learning.",
    icon: "ChartNoAxesCombined",
    color: "bg-emerald-50 text-emerald-600",
  },
];

export const categoryNames = categories.map(
  (category) => category.name
);

export const categoryOptions = categories.map((category) => ({
  label: category.name,
  value: category.name,
}));