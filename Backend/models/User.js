const userSchema = new Schema({
  avatar: String,
  googleAvatar: String,
  githubAvatar: String,
});

const User = model("User", userSchema);

module.exports = User;
