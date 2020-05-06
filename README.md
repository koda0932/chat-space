# README
# ChatSpace DB設計


## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|group_id|integer||null: false, foreign_key: true|
|user_id|string|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group



## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :users, through: :groups_users
- has_many :messages
- has_many :groups_users



## usersテーブル
|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false|
|email|string|null: false|
|password|string||null: false|
### Association
- has_many :messages
- has_many :groups through: :groups_users
- has_many :groups_users


## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

