json.user_id  @message.user.id
json.user_name  @message.user.name
json.group_id  @message.group.id
json.created_at  @message.created_at.try(:strftime,"%Y年%m月%d日")
json.content  @message.content
json.image  @message.image