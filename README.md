# README

19.09.13


This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


  # Database Design


## usersテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, foreign_key: true|
|user_name|string|null: false|
|email|string|null: false|
|user_passwprd|string|null: false|

### 一意性制約
|add_index :users, [ :user_name, :email ] unique: true|

### Association
- has_many :groups, through: :groups_users
- has_many :messages
- has_many :images


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false|

### 一意性制約
add_index :groups, :group_name, unique: true

### Association
- has_many :users, through: :groups_users


## groups_usersテーブル     -中間テーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|group_id|references|null: false, foreign_key: true|
|user_id|references|null: false, foreign_key: true|


### Association
- belongs_to :group
- belongs_to :user

