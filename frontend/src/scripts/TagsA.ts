class TagsA {
  public hrefTagA() {
    const headerLink = document.querySelectorAll(".href") as NodeListOf<HTMLAnchorElement>;
    headerLink.forEach((a) => {
      const token = localStorage.getItem("token") as string;
      a.href += `/${token}`;
    });
  }
}

const a = new TagsA();
a.hrefTagA();
