defmodule CloverCms.Admin.LanguageController do
  use CloverCms.Web, :controller

  alias CloverCms.Language

  def index(conn, _params) do
    languages = Repo.all(Language)
    render(conn, "index.json", languages: languages)
  end

  def create(conn, %{"language" => language_params}) do
    changeset = Language.changeset(%Language{}, language_params)

    case Repo.insert(changeset) do
      {:ok, language} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", admin_language_path(conn, :show, language))
        |> render("show.json", language: language)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(CloverCms.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    language = Repo.get!(Language, id)
    render(conn, "show.json", language: language)
  end

  def update(conn, %{"id" => id, "language" => language_params}) do
    language = Repo.get!(Language, id)
    changeset = Language.changeset(language, language_params)

    case Repo.update(changeset) do
      {:ok, language} ->
        render(conn, "show.json", language: language)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(CloverCms.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    language = Repo.get!(Language, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(language)

    send_resp(conn, :no_content, "")
  end
end
