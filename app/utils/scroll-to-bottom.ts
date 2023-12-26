const scrollToBottom = (element: HTMLDivElement | null) => {
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };


  export default scrollToBottom