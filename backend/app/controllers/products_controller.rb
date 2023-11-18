class ProductsController < ApplicationController
  def index
    products = Product.all

    if keyword
      products = products.where("name ILIKE :keyword OR description ILIKE :keyword",  keyword: "%#{keyword}%")
    end

    if slug
      products = products.where(slug: slug)
    end

    render json: {products: ProductBlueprint.render_as_json(products, view: :normal) }, status: :ok
  end

  def preview
    product = Products::Import.new(
      slug: product_params[:slug],
      submitter_address: product_params[:submitter_address],
      safe_address: product_params[:safe_address],
      preview: true
    ).call

    render json: {product: ProductBlueprint.render_as_json(product, view: :normal) }, status: :ok
  rescue => error
    raise error
    render json: {error: error.message }, status: :bad_request
  end

  def create
    product = Products::Import.new(
      slug: product_params[:slug],
      submitter_address: product_params[:submitter_address],
      safe_address: product_params[:safe_address],
      preview: false
    ).call

    render json: {product: ProductBlueprint.render_as_json(product, view: :normal) }, status: :created
  rescue => error
    render json: {error: error.message }, status: :bad_request
  end

  private

  def keyword
    params["keyword"]
  end

  def slug
    params["slug"]
  end

  def product_params
    params.require(:product)
      .permit(
        :slug,
        :submitter_address
      )
  end
end
