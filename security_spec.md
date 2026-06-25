# Security Spec & Hardened Rules TDD

## Data Invariants
1. **Products**: Must have standard keys and types, prices must be positive numbers.
2. **Orders**: Total price must match the sum of individual cart items and shipping fee. Status must belong to allowed states.
3. **Custom Orders**: Quantity must be a positive integer.
4. **Reviews**: Rating must be between 1 and 5.
5. **Inquiries**: Content must not be empty.
6. **Settings**: Background image URLs must be strings or empty.

## The Dirty Dozen Payloads (Designed to violate Identity, Integrity, and State)
1. **Payload 1**: Product with negative price (Value Poisoning)
2. **Payload 2**: Product with enormous 2MB description string (Denial of Wallet)
3. **Payload 3**: Order with negative totalPrice (Financial Fraud)
4. **Payload 4**: Order with missing required items field (Schema Bypass)
5. **Payload 5**: Order status updated directly to '배송 완료' without being '주문 접수' (State Shortcutting)
6. **Payload 6**: Review with a rating of 10 (Value Poisoning)
7. **Payload 7**: Review with missing content (Validation Gap)
8. **Payload 8**: Custom order with negative quantity (Value Poisoning)
9. **Payload 9**: Custom order with arbitrary adminFeedback written by non-admin (Privilege Escalation)
10. **Payload 10**: Inquiry with arbitrary answers filled by non-admin (Privilege Escalation)
11. **Payload 11**: Injecting a "Ghost Field" (e.g., `isAdmin: true`) into settings (Shadow Update)
12. **Payload 12**: Extremely long ID field size > 128 characters (Resource Poisoning)

## The Test Runner Reference
We will enforce these boundaries strictly within the `firestore.rules` using the validation helpers and `affectedKeys().hasOnly()` gates.
