import { styles } from "@/app/styles/style";
import React from "react";
import CourseImage from "../courses/CourseImage";

type Props = {};

const Cart = (props: Props) => {
  return (
    <div>
      <h1 className={styles.title}>Shopping Cart</h1>
      <div className="flex">
        <div>
            <CourseImage />
        </div>
        <h1></h1>
        <h1></h1>
      </div>
    </div>
  );
};

export default Cart;
