module AuthHelper
  def auth_headers
    username = Rails.application.credentials.admin_auth.username
    password = Rails.application.credentials.admin_auth.password

    {
      "HTTP_AUTHORIZATION" => ActionController::HttpAuthentication::Basic.encode_credentials(username, password)
    }
  end
end
