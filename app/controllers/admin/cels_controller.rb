class Admin::CelsController < ApplicationController
  use_inertia_instance_props

  def index
    @cels = Cel.all
    render inertia: true
  end

end
