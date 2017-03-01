defmodule CloverCms.Admin.FormControllerTest do
  use CloverCms.ConnCase

  alias CloverCms.Form
  @valid_attrs %{name: "some content"}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, admin_form_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    form = Repo.insert! %Form{}
    conn = get conn, admin_form_path(conn, :show, form)
    assert json_response(conn, 200)["data"] == %{"id" => form.id,
      "name" => form.name}
  end

  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, admin_form_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, admin_form_path(conn, :create), form: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Form, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, admin_form_path(conn, :create), form: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    form = Repo.insert! %Form{}
    conn = put conn, admin_form_path(conn, :update, form), form: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Form, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    form = Repo.insert! %Form{}
    conn = put conn, admin_form_path(conn, :update, form), form: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    form = Repo.insert! %Form{}
    conn = delete conn, admin_form_path(conn, :delete, form)
    assert response(conn, 204)
    refute Repo.get(Form, form.id)
  end
end
