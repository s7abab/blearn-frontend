import Category from "@/app/components/admin/category/Category";
import { styles } from "@/app/styles/style";
import React from "react";

type Props = {};

const CategoryPage = (props: Props) => {
  return (
    <div className="h-screen">
      <h1 className={styles.title}>Manage Categories</h1>
      <Category />
    </div>
  );
};

export default CategoryPage;
