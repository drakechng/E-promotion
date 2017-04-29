# Introduction

This book is the document for E-promotion application. 

## Exclusive Summary

This document provide a through installation guide and program structure of the E-promotion program.

The program use the power of the Internet to provide paper-free, eco-friendly ways of vouchers distribute rather than the tradition ways of send people on street to give out the vouchers.

The whole system consists of a Web-based dashboard and native applications both for Android and Ios. The dashboard management program is for the shop holder to add member, distribute virtual vouchers, give out E-stamps, and create new event for promotion. And the mobile application for client to manage there vouchers and E-stamps list. 


## System Overview

### System Scope(Functional Requirement)

#### Customer Side

- [X] *Basic Feature*
  - [X]  User Register System(Third Party Oauth)
  - [X]  Browse membership to different shops(Sorting,Ranking)
  - [X]  Check the royalty system in shop(Point,E-stamp)
  - [X]  Promotion System(Vouchers,Sales notification)

- [X] *Intemedia Feature*
  - [X]  Reedom gift

- [ ] *Advanced Feature*
  - [ ]  E-wallet(Paypel,Wechat-Pay,ALi-Pay) 
  - [ ]  E payment deduct voucher value

#### Merchant Side

- [X] *Basic Feature*
  - [X] Regist Shop
  - [X] Selcet templete from template royalty system
  - [X] Distribute Membership to Customer(IC,Scan QR code)
  - [X] Dashboard to display the info of promotion status
  - [X] Modify shop detail

- [X] *Intemeida Feature*
  - [X] Define Member Teir system Based on points
  - [ ] Define User Groups 
  - [ ] Api to combine our system to the exitsting Pos Systme
  - [X] Create Voucher

- [ ] *Advanced Feature*
  - [ ] Customize The vouchers(Animation) and so on.
  - [ ] Customize tier metal


#### Execution & Evolution qualities(Non-functional Requirement)

- [ ] *Deploy & Opertate*
  - [ ] Docker

- [ ] Backup

- [X] Unit Testing

- [ ] Pressure Tesing


Write by Chenyu
