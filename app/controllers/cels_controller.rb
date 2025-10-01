class CelsController < ApplicationController
  def index
    @cels = Cel.all
    render inertia: "cels/index", props: { cels: @cels }
  end

  def healthcheck
    cel = Cel.find(params[:id])
    render json: cel.check_health
  end
end
