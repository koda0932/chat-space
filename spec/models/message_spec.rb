require 'rails_helper'

describe Message do
  describe '#create' do

  context "メッセージを保存できる場合" do
    it "メッセージがあれば保存できる" do
      message = build(:message, image: "")
      expect(message).to be_valid
    end

    it "画像があれば保存できる" do
      message = build(:message, content: "")
      expect(message).to be_valid
    end

    it "メッセージと画像があれば保存できる" do
      message = build(:message)
      expect(message).to be_valid
    end
  end

  context "メッセージを保存できない場合" do
    it "メッセージも画像も無いと保存できないこと"do
      message = build(:message, content: "", image: "")
      message.valid?
      expect(message.errors[:content]).to include("を入力してください")
    end

    it "group_idが無いと保存できないこと"do
      message = build(:message, group_id: "")
      message.valid?
      expect(message.errors[:group]).to include("を入力してください")
    end

    it ' user_idが無いと保存できないこと' do
      message = build(:message, user_id: nil)
      message.valid?
      expect(message.errors[:user]).to include("を入力してください")
    end
  end

  end
end