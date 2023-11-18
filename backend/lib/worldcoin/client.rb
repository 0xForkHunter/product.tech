module Worldcoin
  class Client
    BASE_URI = "https://developer.worldcoin.org"
    APP_ID = ENV["WORLDCOIN_APP_ID"]

    def verify(proof:)
      url = "#{BASE_URI}/api/v1/verify/#{APP_ID}"

      Faraday.post(url, proof, headers)
    end

    private

    def headers
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    end
  end
end
