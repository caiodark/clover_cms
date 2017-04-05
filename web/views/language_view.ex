defmodule CloverCms.Admin.LanguageView do
  use CloverCms.Web, :view

  def render("index.json", %{languages: languages}) do
    %{data: render_many(languages, CloverCms.Admin.LanguageView, "language.json")}
  end

  def render("show.json", %{language: language}) do
    %{data: render_one(language, CloverCms.Admin.LanguageView, "language.json")}
  end

  def render("language.json", %{language: language}) do
    %{id: language.id,
      url: language.url,
      name: language.name}
  end
end
