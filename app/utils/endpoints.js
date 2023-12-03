const endpoints = {
  user: {
    register: "/api/v1/user/register",
    login: "/api/v1/user/login",
    activate_user: "/api/v1/user/activate-user",
    social_auth: "/api/v1/user/social-auth",
    logout: "/api/v1/user/logout",
    update_user_avatar: "/api/v1/user/update-user-avatar",
    get_current_user: "/api/v1/user/current-user",
    update_user: "/api/v1/user/update-user",
    admin: {
      get_users: "/api/v1/admin/users",
      get_instructors: "/api/v1/admin/instructors",
      get_single_user: "/api/v1/admin/single-user",
      get_single_instructor: "/api/v1/admin/single-instructor",
      block_user: "/api/v1/admin/block-user",
    },
  },
  course: {
    add_course: "/api/v1/course/create-course",
    get_all_courses: "/api/v1/course/get-all-courses",
    get_single_course: "/api/v1/course/get-single-course",
    edit_course: "/api/v1/course/edit-course",

    category: {
      add_category: "/api/v1/course/category/create-category",
      edit_category: "/api/v1/course/category/edit-category",
      unlist_category: "/api/v1/course/category/unlist-category",
      get_all_category: "/api/v1/course/category/get-all-category",
      get_single_category: "/api/v1/course/category/get-single-category",
    },

    user: {
      get_enrolled_course: "/api/v1/course/user/enrolled-courses",
    },
  },

  payment: {
    get_stripe_publishable_key: "/api/v1/payment/stripepublishablekey",
    create_payment_intent: "/api/v1/payment/new-payment",
    create_order: "/api/v1/payment/create-order",
  },
};

export default endpoints;
