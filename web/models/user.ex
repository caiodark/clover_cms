defmodule CloverCms.User do
  use CloverCms.Web, :model
  alias CloverCms.Repo

  schema "users" do
    field :name, :string
    field :email, :string
    field :password, :string
    belongs_to :user_type, CloverCms.UserType 
    has_many :user_type_roles_permissions, through: [:user_type, :roles, :permission]
    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :email, :password, :user_type_id])
    |> assoc_constraint(:user_type)
    |> validate_required([:name, :email, :password])
  end

  def list() do
    CloverCms.User |> Repo.all |> Repo.preload([:user_type, :user_type_roles_permissions])
  end

  def by_id(id) do
    Repo.get!(CloverCms.User, id)
  end

  def encrypt_pass(pass) do
    Base.encode16(:crypto.hash(:sha256, pass))
  end

  @doc """
  Change password for the given user only if the pass match
  """
  def change_password(old_password, new_pass_1, new_pass_2, id) do
    if new_pass_1 == new_pass_2 do
      user = CloverCms.User.by_id(id)
      if (user.password == encrypt_pass(old_password)) do
        changeset = CloverCms.User.changeset(user, %{password: encrypt_pass(new_pass_1)})
        Repo.update(changeset)
      end
    end
  end

  @doc """
  Authenticate the user given the right username and password
  """
  def authenticate(username, password) do
    pass = encrypt_pass(password)
    try do
      Repo.one!(CloverCms.User, username: username, password: pass)
      true
    rescue
      _  ->
       false
    end
  end
end
