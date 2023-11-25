const endpoints = {
  auth: {
    register: "/api/v1/register",
    login: "/api/v1/login",
    activate_user: "/api/v1/activate-user",
    social_auth: "/api/v1/social-auth",
    logout: "/api/v1/logout",
    update_user_avatar: "/api/v1/update-user-avatar",
    get_current_user: "/api/v1/current-user",
    update_user: "/api/v1/update-user",
  },
  courses: {
    add_course: "/api/v1/course/create-course",
    get_all_courses: "/api/v1/course/get-all-courses",
    get_single_course: "/api/v1/course/get-single-course/:courseId",
    edit_course: "/api/v1/course/edit-course",
  },
  category: {
    add_category: "/api/v1/category/create-category",
    edit_category: "/api/v1/category/edit-category",
    unlist_category: "/api/v1/category/unlist-category",
    get_all_category: "/api/v1/category/get-all-category",
    get_single_category: "/api/v1/category/get-single-category",
  },
  admin: {
    get_users: "/api/v1/admin/users",
    get_instructors: "/api/v1/admin/instructors",
    get_single_user: "/api/v1/admin/single-user",
    get_single_instructor: "/api/v1/admin/single-instructor",
    block_user: "/api/v1/admin/block-user",
  },
};

export default endpoints;
