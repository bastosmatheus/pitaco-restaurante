class TagsA {
  private headerLink = document.querySelectorAll(
    ".header__link.admin"
  ) as NodeListOf<HTMLAnchorElement>;

  public hrefTagA() {
    this.headerLink.forEach((a) => {
      const token = localStorage.getItem("token") as string;
      a.href += `/${token}`;
    });
  }
}

const a = new TagsA();
a.hrefTagA();
