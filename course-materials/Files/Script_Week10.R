data <- read.csv("~/Fake/GACTT_RESULTS_ANONYMIZED_v2.csv", header=TRUE)
head(data, 5)
str(data)
summary(data)

data$What.is.your.age. <- as.factor(data$What.is.your.age.)
data$How.many.cups.of.coffee.do.you.typically.drink.per.day. <- as.factor(data$How.many.cups.of.coffee.do.you.typically.drink.per.day.)
data$Where.do.you.typically.drink.coffee. <- as.factor(data$Where.do.you.typically.drink.coffee.)
summary(data)

data2 <- data[,c("Submission.ID",
                 "What.is.your.age.",
                 "How.many.cups.of.coffee.do.you.typically.drink.per.day.",
                 "Where.do.you.typically.drink.coffee.")] 
levels(data2$What.is.your.age.)
levels(data2$How.many.cups.of.coffee.do.you.typically.drink.per.day.)
levels(data2$Where.do.you.typically.drink.coffee.)

data2 <- subset(data2, What.is.your.age. != "")
data2$What.is.your.age. <- droplevels(data2$What.is.your.age.)

data2 <- subset(data2, How.many.cups.of.coffee.do.you.typically.drink.per.day. != "")
data2$How.many.cups.of.coffee.do.you.typically.drink.per.day. <- droplevels(data2$How.many.cups.of.coffee.do.you.typically.drink.per.day.)

library(dplyr)
data3 <- data2 %>% 
  group_by(What.is.your.age., How.many.cups.of.coffee.do.you.typically.drink.per.day.) %>% 
  summarize(Count = n())

plot(x = data3$What.is.your.age., y = data3$Count)
plot(x = data3$How.many.cups.of.coffee.do.you.typically.drink.per.day., y = data3$Count)

levels(data3$What.is.your.age.)
data3$What.is.your.age. <- factor(data3$What.is.your.age., levels = c("<18 years old",
                                                                      "18-24 years old",
                                                                      "25-34 years old",
                                                                      "35-44 years old",
                                                                      "45-54 years old",
                                                                      "55-64 years old",
                                                                      ">65 years old"))
levels(data3$What.is.your.age.)

levels(data3$How.many.cups.of.coffee.do.you.typically.drink.per.day.)
data3$How.many.cups.of.coffee.do.you.typically.drink.per.day. <- factor(data3$How.many.cups.of.coffee.do.you.typically.drink.per.day., levels = c("Less than 1",
                                                                      "1",
                                                                      "2",
                                                                      "3",
                                                                      "4",
                                                                      "More than 4"))
levels(data3$How.many.cups.of.coffee.do.you.typically.drink.per.day.)

plot(x = data3$What.is.your.age., y = data3$Count)
plot(x = data3$How.many.cups.of.coffee.do.you.typically.drink.per.day., y = data3$Count)

save(data3, file = "data.Rdata")
write.csv(data3, "data3.csv", row.names = FALSE)