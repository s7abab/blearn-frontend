
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
    update_bankdetails: "/api/v1/user/update-bankdetails",
    instructor_application: "/api/v1/user/instructor-application",
    admin: {
      get_users: "/api/v1/user/users",
      get_instructors: "/api/v1/user/instructors",
      get_single_user: "/api/v1/user/single-user",
      get_single_instructor: "/api/v1/user/single-instructor",
      block_user: "/api/v1/user/block-user",
      get_applications: "/api/v1/user/get-applications",
      get_application: "/api/v1/user/get-application",
      change_status_of_application:
        "/api/v1/user/change_status_of_applications",
    },
  },
  course: {
    add_course: "/api/v1/course/create-course",
    edit_course: "/api/v1/course/edit-course",
    search_courses: "/api/v1/course/search-courses",
    get_all_courses: "/api/v1/course/get-all-courses",
    get_single_course: "/api/v1/course/get-single-course",
    edit_course: "/api/v1/course/edit-course",
    get_courses_for_instructor: "/api/v1/course/get-courses-for-instructor",
    get_single_course_for_instructor:
      "/api/v1/course/get-course-for-instructor",
    add_module: "/api/v1/course/add-module",
    get_modules: "/api/v1/course/get-modules",
    edit_module: "/api/v1/course/edit-module",
    delete_module: "/api/v1/course/delete-module",
    add_lesson: "/api/v1/course/add-lesson",
    update_lesson: "/api/v1/course/update-lesson",
    track_lesson: "/api/v1/course/track-lesson",
    get_progression: "/api/v1/course/get-progression",

    category: {
      add_category: "/api/v1/course/category/create-category",
      edit_category: "/api/v1/course/category/edit-category",
      unlist_category: "/api/v1/course/category/unlist-category",
      get_all_category: "/api/v1/course/category/get-all-category",
      get_single_category: "/api/v1/course/category/get-single-category",
    },

    user: {
      get_enrolled_course: "/api/v1/course/enrolled-courses",
      get_single_enrolled_course: "/api/v1/course/single-enrolled-course",
    },

    feedback: {
      create_feedback: "/api/v1/course/feedback/create-feedback",
      get_feedbacks: "/api/v1/course/feedback/get-feedbacks",
    },
  },

  payment: {
    get_stripe_publishable_key: "/api/v1/payment/stripepublishablekey",
    create_payment_intent: "/api/v1/payment/new-payment",
    create_order: "/api/v1/payment/create-order",
    analytics: {
      get_revenue_of_course: "api/v1/analytics/revenue",
    },
    withdraw_money: "/api/v1/withdrawals/withdraw-money",
    get_withdrawals: "/api/v1/withdrawals/get-withdrawals",
    update_withdrawal_status: "/api/v1/withdrawals/update-withdrawal-status",
    get_pending_withdrawals: "/api/v1/withdrawals/get-pending-withdrawals",
  },

  valuation: {
    create_exam: "/api/v1/valuation/create-exam",
    get_exam: "/api/v1/valuation/get-exam",
    create_question: "/api/v1/valuation/create-question",
    delete_question: "/api/v1/valuation/delete-question",
    update_question: "/api/v1/valuation/update-question",
    add_completed_user: "/api/v1/valuation/add-completed-user",
  },

  realtime: {
    create_chatroom: "/api/v1/realtime/chatRoom/create-chatroom",
    get_chatrooms_for_instructor:
      "/api/v1/realtime/chatRoom/get-chatrooms-for-instructor",
    get_chatroom: "/api/v1/realtime/chatRoom/get-chatroom",
    get_chatroom_by_courseId:
      "/api/v1/realtime/chatRoom/get-chatroom-by-courseid",
    get_messages: "/api/v1/realtime/message/get-messages",
  },

  cloud: {
    upload: "/api/v1/upload",
    get_url: "/api/v1/get-url",
  },
};

export default endpoints;
