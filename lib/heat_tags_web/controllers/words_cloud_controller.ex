defmodule HeatTagsWeb.WordsCloudController do
  use HeatTagsWeb, :controller

  alias HeatTags.Tags.Count

  def create(conn, _params) do
    get_words(conn)
  end

  def get_words(conn) do
    conn
    |> put_status(:created)
    |> render("words.json", words: Count.call())
  end
end
