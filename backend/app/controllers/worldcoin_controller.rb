class WorldcoinController < ApplicationController
  def verify_proof
    verify_proof!

    render json: {success: true }, status: :bad_request
  rescue => error
    raise error
    render json: {error: error.message }, status: :bad_request
  end

  private

  def verify_proof!
    return true if worldcoin_response_body["success"]

    raise "Verification failed with code: #{worldcoin_response_body["code"]}. Detail: #{worldcoin_response_body["detail"]}"
  end

  def worldcoin_response_body
    @worldcoin_response_body ||= JSON.parse(worldcoin_response.body)
  end

  def worldcoin_response
    @worldcoin_response ||= worldcoin_client.verify(proof: proof.to_json)
  end

  def proof
    @proof ||= required_params.to_h.merge(
      action: "verify-owner",
      signal: "signal-#{params[:wallet]}"
    )
  end

  def worldcoin_client
    Worldcoin::Client.new
  end

  def required_params
    params.require(:worldcoin_proof).permit(
      :merkle_root,
      :credential_type,
      :nullifier_hash,
      :proof,
      :chain
    )
  end
end
