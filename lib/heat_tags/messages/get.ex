defmodule HeatTags.Messages.Get do
  import Ecto.Query

  alias HeatTags.{Message, Repo}

  def today_messages do
    today = Date.utc_today()
    query = from message in Message, where: type(message.inserted_at, :date) == ^today

    Repo.all(query)
  end

  def message_by_id(id) do
    query = from message in Message, where: message.id == ^id

    Repo.all(query)
  end

  def messages_by_email(email) do
    query = from message in Message, where: message.email == ^email

    Repo.all(query)
  end
end
