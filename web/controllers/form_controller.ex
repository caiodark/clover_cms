defmodule CloverCms.Admin.FormController do
  use CloverCms.Web, :controller

  alias CloverCms.Form

  def index(conn, _params) do
    forms = Repo.all(Form)
    render(conn, "index.json", forms: forms)
  end

  def create(conn, %{"form" => form_params}) do
    changeset = Form.changeset(%Form{}, form_params)

    case Repo.insert(changeset) do
      {:ok, form} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", admin_form_path(conn, :show, form))
        |> render("show.json", form: form)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(CloverCms.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    form = Repo.get!(Form, id)
    render(conn, "show.json", form: form)
  end

  def update(conn, %{"id" => id, "form" => form_params}) do
    form = Repo.get!(Form, id)
    changeset = Form.changeset(form, form_params)

    case Repo.update(changeset) do
      {:ok, form} ->
        render(conn, "show.json", form: form)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(CloverCms.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    form = Repo.get!(Form, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(form)

    send_resp(conn, :no_content, "")
  end
end
