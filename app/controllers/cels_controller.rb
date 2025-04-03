class CelsController < ApplicationController
  # GET /cels or /cels.json
  def index
    @cels = Cel.all
    render inertia: "cels/index", props: { cels: @cels }
  end

  def healthcheck
    cel = Cel.find(params[:id])
    render json: HealthCheck::HealthCheckService.check(cel.url)
  end
end
