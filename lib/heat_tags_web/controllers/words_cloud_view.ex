defmodule HeatTagsWeb.WordsCloudView do
  use HeatTagsWeb, :view

  def render("words.json", %{words: words}) do
    %{
      words: words
    }
  end
end
