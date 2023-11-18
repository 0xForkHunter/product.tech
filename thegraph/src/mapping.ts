import { BigInt } from "@graphprotocol/graph-ts"
import { Product, KeyHolder } from "../generated/schema"
import { ProductCreated, ProductKeyBought, ProductKeySold } from "../generated/ProductKeys/ProductKeys"

const ONE_BI = BigInt.fromString('1')
const ZERO_BI = BigInt.fromString('0')

export function handleProductCreated(event: ProductCreated): void {
  let product = new Product(event.params._productSlug)
  product.submitterAddress = event.params._owner.toHex()
  product.supply = ZERO_BI
  product.buyPrice = ZERO_BI
  product.sellPrice = ZERO_BI

  product.save()
}

export function handleProductKeyBought(event: ProductKeyBought): void {
  let product = Product.load(event.params._productSlug)
  if (product === null) {
    product = new Product(event.params._productSlug)
  }
  
  let relationshipID = event.params._productSlug + "-" + event.params._trader.toHexString()
  let keyHolder = KeyHolder.load(relationshipID)

  if (keyHolder === null) {
    keyHolder = new KeyHolder(relationshipID)
    keyHolder.product = product.id
    keyHolder.wallet = event.params._trader.toHexString()
    keyHolder.keysAmount = ZERO_BI
  }

  product.supply = product.supply.plus(ONE_BI)
  product.buyPrice = event.params._nextPrice;
  product.sellPrice = event.params._sellPrice;
  keyHolder.keysAmount = keyHolder.keysAmount.plus(ONE_BI)

  keyHolder.save()
  product.save()
}

export function handleProductKeySold(event: ProductKeySold): void {
  let product = Product.load(event.params._productSlug)
  if (product === null) {
    product = new Product(event.params._productSlug)
  }

  let relationshipID = event.params._productSlug + "-" + event.params._trader.toHexString()
  let keyHolder = KeyHolder.load(relationshipID)
  if (keyHolder === null) {
    keyHolder = new KeyHolder(relationshipID)
    keyHolder.product = product.id
    keyHolder.wallet = event.params._trader.toHexString()
    keyHolder.keysAmount = ZERO_BI
  }

  product.buyPrice = event.params._nextPrice;
  product.sellPrice = event.params._sellPrice;
  product.supply = product.supply.minus(ONE_BI)
  keyHolder.keysAmount = keyHolder.keysAmount.minus(ONE_BI)

  keyHolder.save()
  product.save()
}