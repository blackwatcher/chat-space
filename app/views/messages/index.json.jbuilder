if @new_messages.present? 
  json.array! @new_messages do |message|
  	json.id message.id
  	json.group_id message.group_id
    json.user_id  message.user.id
    json.user_name  message.user.name
    json.created_at  message.created_at.strftime("%Y年%m月%d日")
    json.content  message.content
    json.image  message.image
  end
end