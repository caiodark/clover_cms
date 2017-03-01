defmodule CloverCms.Admin.FormView do
  use CloverCms.Web, :view

  def render("index.json", %{forms: forms}) do
    %{data: render_many(forms, CloverCms.Admin.FormView, "form.json")}
  end

  def render("show.json", %{form: form}) do
    %{data: render_one(form, CloverCms.Admin.FormView, "form.json")}
  end

  def render("form.json", %{form: form}) do
    %{id: form.id,
      name: form.name}
  end
end
