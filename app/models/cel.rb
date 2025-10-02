require 'ostruct'

class Cel < ApplicationRecord
  attr_reader :health_data
  
  def check_health
    uri = URI.parse(self.url)
    res = Net::HTTP.get_response uri
    @health_data = JSON.parse(res.body).to_o
    res.body
  end

  def method_missing(method_name, *args, &block)
    if @health_data&.respond_to?(method_name)
      @health_data.send(method_name, *args, &block)
    else
      super
    end
  end

  def healthy?
    @health_data&.healthy == true
  end

  def unhealthy?
    !healthy?
  end
end