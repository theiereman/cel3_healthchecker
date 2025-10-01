class Cel < ApplicationRecord
  def check_health
    uri = URI(self.url)
    res = Net::HTTP.get_response uri
    res.body
  end
end
