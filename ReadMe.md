# ForexDemo
This is a quick demo of ReactJS using javascript and a custom built REST service. 

## Why? 
The reason I built this was to just quickly update my knowledge of Javascript. Since I've recently been asked about ReactJS, I figured "What better way than by building a React App?" 

So I did just that. The app represents 3 hours of tutorial reading and 6 hours of programming. Though most of the programming was more "administrative" tasks and less "programming." 

## What's it do? 

It queries for FOREX data from the GBPUSD from 2000 to 2017 in the minute timescale. In order to do this, I had to make a database with all of that data. It uses this data to create a candle-stick chart and allows the user to navigate through different days within the data window. 

## Controls

After selecting dates, or just leaving the defaults, you can pan with the left/right click, and zoom in or out on the time scale with the scroll wheel.

Hovering will give you the details for that particular minute. 

## Will you update this? 

Probably. I had intended to add my own specific indicator that I developed in MT4, however, I've run out of time at the moment. If I get to continue working on it, I will add the indicator and fields to allow the user to simulate an automated trading advisor, and see the results of how such an Expert Advisor would trade based on my indicator. 
