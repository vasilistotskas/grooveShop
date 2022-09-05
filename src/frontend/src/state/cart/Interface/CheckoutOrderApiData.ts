import CartItemCheckoutModel from '@/state/cart/CartItemCheckoutModel'

export default interface CheckoutOrderApiData {
  user_id: number
  pay_way: string
  first_name: string
  last_name: string
  email: string
  address: string
  zipcode: number
  place: string
  phone: number
  city: string
  country: string
  region: string
  customer_notes: string
  items: Array<CartItemCheckoutModel>
}
