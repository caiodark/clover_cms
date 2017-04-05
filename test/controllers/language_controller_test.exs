defmodule CloverCms.LanguageControllerTest do
  use CloverCms.ConnCase

  alias CloverCms.Language
  @valid_attrs %{name: "some content", url: "some content"}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, admin_language_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    language = Repo.insert! %Language{}
    conn = get conn, admin_language_path(conn, :show, language)
    assert json_response(conn, 200)["data"] == %{"id" => language.id,
      "url" => language.url,
      "name" => language.name}
  end

  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, admin_language_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, admin_language_path(conn, :create), language: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Language, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, admin_language_path(conn, :create), language: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    language = Repo.insert! %Language{}
    conn = put conn, admin_language_path(conn, :update, language), language: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Language, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    language = Repo.insert! %Language{}
    conn = put conn, admin_language_path(conn, :update, language), language: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    language = Repo.insert! %Language{}
    conn = delete conn, admin_language_path(conn, :delete, language)
    assert response(conn, 204)
    refute Repo.get(Language, language.id)
  end
end
