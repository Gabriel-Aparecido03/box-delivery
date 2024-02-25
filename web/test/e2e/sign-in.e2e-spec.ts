import { expect ,test } from '@playwright/test'

test('Sign in successfly with admin',async ({ page,  }) => {
  await page.goto('/',{ waitUntil : 'domcontentloaded' })

  await page.getByPlaceholder('Document number').fill('12345678900')
  await page.getByPlaceholder('Password').fill('123')
  await page.getByTestId('button').click()

  await page.waitForTimeout(2000)
  
  expect(page.url()).toContain('/dashboard/control/deliverymans')
})

test('Sign in successfly with deliveryman',async ({ page,  }) => {
  await page.goto('/',{ waitUntil : 'domcontentloaded' })

  await page.getByRole('link', { name: 'Are you deliveryman ? Make' }).click()

  await page.getByPlaceholder('Document number').fill('12345678900')
  await page.getByPlaceholder('Password').fill('123')
  await page.getByTestId('button').click()
  
  await page.waitForTimeout(2000)

  expect(page.url()).toContain('/dashboard/deliveryman/my-packages')
})